/*
Highlight a button and detect when it is clicked

Gilberto Echeverria
2024-03-06
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SimonButton : MonoBehaviour
{
    Color originalColor;
    AudioSource audioSource;

    void Start()
    {
        audioSource = GetComponent<AudioSource>();
        originalColor = GetComponent<Image>().color;
    }

    // Method called from the SimonController to highlight the button
    public void HighLight()
    {
        audioSource.Play();
        StartCoroutine(ChangeColor());
    }

    // Briefly switch to white color before going back to the original color
    IEnumerator ChangeColor()
    {
        GetComponent<Image>().color = Color.white;
        yield return new WaitForSeconds(0.5f);
        GetComponent<Image>().color = originalColor;
    }
}
