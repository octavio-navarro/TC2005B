/*
Highligth the button and make it play a sound

Gilberto Echeverria
2024-04-24
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SimonButton : MonoBehaviour
{
    [SerializeField] float delay;
    Color originalColor;

    // Start is called before the first frame update
    void Start()
    {
        originalColor = GetComponent<Image>().color;
    }

    public void Highlight()
    {
        StartCoroutine(ChangeColor());
    }

    IEnumerator ChangeColor()
    {
        GetComponent<Image>().color = Color.white;
        // Wait a moment before restoring the original color
        yield return new WaitForSeconds(delay);
        GetComponent<Image>().color = originalColor;
    }
}
