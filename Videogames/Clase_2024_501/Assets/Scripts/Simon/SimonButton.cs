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

    AudioSource audioSource;

    public void Init(int index)
    {
        originalColor = GetComponent<Image>().color;
        audioSource = GetComponent<AudioSource>();
        audioSource.clip = Resources.Load<AudioClip>($"Audio/{index}");
    }

    public void Highlight()
    {
        audioSource.Play();
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
