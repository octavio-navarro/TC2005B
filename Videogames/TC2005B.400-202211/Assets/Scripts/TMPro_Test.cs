/*
Fill a list of TMP fields with the names obtained from an API
To make the ScrollView content adjust to the contents, use this:
https://unitycoder.com/blog/2016/02/23/ui-scroll-view-automatic-content-height/

To define values for the selector in the Unity inspector:
https://answers.unity.com/questions/15250/how-to-declare-and-use-a-enum-variable-in-javascri.html

To set the callback for a button via script:
https://docs.unity3d.com/530/Documentation/ScriptReference/UI.Button-onClick.html
https://stackoverflow.com/questions/69124774/unity-setting-buttons-onclick-in-script

Stretching UI elements: 
https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/HOWTO-UICreateFromScripting.html

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.UI;
using TMPro;

public enum PrefabType { Text, Button }

public class TMPro_Test : MonoBehaviour
{
    [SerializeField] PrefabType type;
    [SerializeField] GameObject textPrefab;
    [SerializeField] GameObject buttonPrefab;
    [SerializeField] Transform contentTransform;
    [SerializeField] TextMeshProUGUI greetField;

    public void LoadNames(UserList allUsers)
    {
        ClearContents();
        GameObject uiItem;
        for (int i=0; i<allUsers.users.Count; i++) {
            // Create new GUI objects
            if (type == PrefabType.Button) {
                uiItem = Instantiate(buttonPrefab);
            } else {
                uiItem = Instantiate(textPrefab);
            }
            // Add them to the ScollView content
            uiItem.transform.SetParent(contentTransform);

            // Set the position of each element
            RectTransform rectTransform = uiItem.GetComponent<RectTransform>();
            rectTransform.anchoredPosition = new Vector2 (0, -50 * i);

            // Extract the text from the argument object
            User us = allUsers.users[i];
            //Debug.Log("ID: " + us.id_users + " | " + us.name + " " + us.surname);

            if (type == PrefabType.Button) {
                // Set the text
                TextMeshProUGUI field = uiItem.GetComponentInChildren<TextMeshProUGUI>();
                field.text = "ID: " + us.id_users + " | " + us.name + " " + us.surname;
                // Set the callback
                Button btn = uiItem.GetComponent<Button>();
		        btn.onClick.AddListener(delegate {GreetName(us.name + " " + us.surname); });
            } else if (type == PrefabType.Text) {
                TextMeshProUGUI field = uiItem.GetComponent<TextMeshProUGUI>();
                field.text = "ID: " + us.id_users + " | " + us.name + " " + us.surname;
            }
        }
    }

    // Delete any child objects
    void ClearContents()
    {
        foreach (Transform child in contentTransform) {
            Destroy(child.gameObject);
        }
    }

    void GreetName(string name)
    {
        greetField.text = "Welcome " + name + "!";
    }
}
