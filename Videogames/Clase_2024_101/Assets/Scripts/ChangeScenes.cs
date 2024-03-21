/*
Script to change to a different scene
Used in the UI buttons

Gilberto Echeverria
2024-03-21
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChangeScenes : MonoBehaviour
{
    public void GoTo(string scene)
    {
        // Load the scene
        UnityEngine.SceneManagement.SceneManager.LoadScene(scene);        
    }
}