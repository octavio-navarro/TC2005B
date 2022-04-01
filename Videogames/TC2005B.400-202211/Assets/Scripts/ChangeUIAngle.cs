/*
Change a numerical value using buttons and
store it using PlayerPrefs

GIlberto Echeverria
*/

using UnityEngine;
using UnityEngine.UI;

public class ChangeUIAngle : MonoBehaviour
{
    [SerializeField] Text display;

    float angle = 0.0f;

    void Start()
    {
        angle = PlayerPrefs.GetFloat("Angle", 0.0f);
        display.text = angle.ToString();
    }

    public void ChangeValue(float value)
    {
        angle += value;
        display.text = angle.ToString();
        PlayerPrefs.SetFloat("Angle", angle);
    }
}
