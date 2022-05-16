/*
ALlow adjusting the UI font on Unity
From: 
https://gist.github.com/Diman119/223fbaf376d88a8adc234d095c040ce4

Applied:
2022-04-30
*/

#if UNITY_EDITOR

using System.Collections.Generic;
using UnityEngine;
using UnityEditor;
using System.Reflection;
using System.IO;
using System.Text;

public class EditorFontResizer : EditorWindow {

    [MenuItem("Window/Editor Font Resizer")]
    static void Open() => GetWindow<EditorFontResizer>("Editor Font Resizer").minSize = new Vector2(180, 30);

    const string _configPath = "EditorFontResizer.cfg";
    static Dictionary<string, int> _config;

    class StyleInfo {
        public string name;
        GUIStyle _style;

        public int FontSize {
            get => _config[name];
            set {
                if (value > 0) {
                    _config[name] = _style.fontSize = value;
                }
            }
        }

        public StyleInfo(string _name, GUIStyle __style) {
            name = _name;
            _style = __style;
            if (_style.fontSize < 1) {
                _style.fontSize = 11;
            }
            if (_config.ContainsKey(name)) {
                _style.fontSize = _config[name];
            } else {
                _config.Add(name, _style.fontSize);
            }
        }
    }

    List<StyleInfo> _editorStyles;
    List<StyleInfo> _guiStyles;
    List<StyleInfo> _customStyles;

    Dictionary<string, bool> _foldouts = new Dictionary<string, bool>();

    GUIStyle _evenBG;
    GUIStyle _oddBG;

    Vector2 _scroll;

    void InitStyles() {
        if (_evenBG != null) {
            return;
        }
        GUIStyle s = "CN EntryBackEven";
        _evenBG = new GUIStyle(s);
        s = "CN EntryBackOdd";
        _oddBG = new GUIStyle(s);
        _evenBG.contentOffset = _oddBG.contentOffset = Vector2.zero;
        _evenBG.clipping = _oddBG.clipping = TextClipping.Clip;
        _evenBG.margin = _oddBG.margin =
        _evenBG.padding = _oddBG.padding = new RectOffset();
    }

    GUIStyle TryGetGUIStyle(PropertyInfo x, object item) {
        if (string.IsNullOrEmpty(x.Name) || x.PropertyType != typeof(GUIStyle)) {
            return null;
        }
        return (GUIStyle) x.GetValue(item, null);
    }

    bool ValidFontStyle(GUIStyle s) {
        return s != null && !string.IsNullOrEmpty(s.name);
    }

    Dictionary<string, int> ReadDictionary(string path) {
        Dictionary<string, int> dict = new Dictionary<string, int>();
        FileInfo fileInfo = new FileInfo(path);
        if (fileInfo.Exists) {
            using (FileStream fileStream = fileInfo.OpenRead()) {
                using (StreamReader reader = new StreamReader(fileStream, Encoding.UTF8)) {
                    while (!reader.EndOfStream) {
                        string[] pair = reader.ReadLine().Split(':');
                        dict[pair[0]] = int.Parse(pair[1]);
                    }
                }
            }
        }
        return dict;
    }

    void WriteDictionary(Dictionary<string, int> dict, string path) {
        using (StreamWriter file = new StreamWriter(path)) {
            foreach (var pair in dict) {
                file.WriteLine("{0}:{1}", pair.Key, pair.Value);
            }
        }
    }

    void InitProperties() {
        if (_editorStyles != null && _guiStyles != null && _customStyles != null) {
            return;
        }

        var trackedStyles = new HashSet<GUIStyle>();
        _config = ReadDictionary(_configPath);

        _editorStyles = new List<StyleInfo>();
        var flags = BindingFlags.Static | BindingFlags.Public | BindingFlags.GetProperty;
        foreach (var x in typeof(EditorStyles).GetProperties(flags)) {
            var s = TryGetGUIStyle(x, null);
            if (s == null || trackedStyles.Contains(s)) {
                continue;
            }
            trackedStyles.Add(s);
            _editorStyles.Add(new StyleInfo("editor." + x.Name, s));
        }

        _guiStyles = new List<StyleInfo>();
        foreach (var x in GUI.skin.GetType().GetProperties()) {
            var s = TryGetGUIStyle(x, GUI.skin);
            if (s == null || trackedStyles.Contains(s)) {
                continue;
            }
            trackedStyles.Add(s);
            _guiStyles.Add(new StyleInfo("gui." + x.Name, s));
        }

        _customStyles = new List<StyleInfo>();
        foreach (var s in GUI.skin.customStyles) {
            if (!ValidFontStyle(s) || trackedStyles.Contains(s)) {
                continue;
            }
            trackedStyles.Add(s);
            _customStyles.Add(new StyleInfo("custom." + s.name, s));
        }

        ApplyChanges();
    }

    void RepaintAllWindows() {
        foreach (var w in Resources.FindObjectsOfTypeAll<EditorWindow>()) {
            w.Repaint();
        }
    }

    void ApplyChanges() {
        WriteDictionary(_config, _configPath);
        RepaintAllWindows();
    }

    bool Header(string name) {
        if (!_foldouts.ContainsKey(name)) {
            _foldouts.Add(name, true);
        }
        GUILayout.Space(5);
        var foldout = EditorGUILayout.Foldout(!_foldouts[name], name, true);
        _foldouts[name] = !foldout;
        return foldout;
    }

    void FontSizeRow(StyleInfo styleInfo, bool even) {
        int delta = FontSizeRow(styleInfo.name, styleInfo.FontSize.ToString(), even ? _evenBG : _oddBG);
        if (delta != 0) {
            styleInfo.FontSize += delta;
            ApplyChanges();
        }
    }

    int FontSizeRow(string name, string size, GUIStyle style) {
        var width = GUILayout.MaxWidth(Screen.width);
        using (new GUILayout.HorizontalScope(style, width)) {
            GUILayout.Label(name);
            GUILayout.FlexibleSpace();

            if (GUILayout.Button("-", EditorStyles.miniButtonLeft)) {
                return -1;
            }
            using (new EditorGUI.DisabledGroupScope(true)) {
                GUILayout.Label(size, EditorStyles.miniButtonMid, GUILayout.Width(30));
            }
            if (GUILayout.Button("+", EditorStyles.miniButtonRight)) {
                return 1;
            }
        }
        return 0;
    }

    void OnGUI() {
        InitStyles();

        GUILayout.Label("Editor Font Resizer", EditorStyles.boldLabel, GUILayout.MaxWidth(Screen.width));

        int rowCount = 0;
        using (var scope = new GUILayout.ScrollViewScope(_scroll)) {
            _scroll = scope.scrollPosition;

            if (GUILayout.Button("Reload Config", EditorStyles.miniButtonMid)) {
                _editorStyles = _guiStyles = _customStyles = null;
            }
            InitProperties();

            int delta = FontSizeRow("Global Zoom", _config["editor.miniLabel"].ToString(), _oddBG);
            if (delta != 0) {
                foreach (var style in _editorStyles) {
                    style.FontSize += delta;
                }
                foreach (var style in _guiStyles) {
                    style.FontSize += delta;
                }
                foreach (var style in _customStyles) {
                    style.FontSize += delta;
                }
                ApplyChanges();
            }

            if (Header("Editor Styles")) {
                foreach (var style in _editorStyles) {
                    FontSizeRow(style, rowCount % 2 == 0);
                    ++rowCount;
                }
            }
            if (Header("GUI Skins")) {
                foreach (var style in _guiStyles) {
                    FontSizeRow(style, rowCount % 2 == 0);
                    ++rowCount;
                }
            }
            if (Header("Custom Styles")) {
                foreach (var style in _customStyles) {
                    FontSizeRow(style, rowCount % 2 == 0);
                    ++rowCount;
                }
            }
        }
    }
}

#endif