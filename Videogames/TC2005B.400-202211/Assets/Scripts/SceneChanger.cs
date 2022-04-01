/*
Switch to another scene in the project

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneChanger : MonoBehaviour
{
    public void GoToScene(string scene)
    {
        SceneManager.LoadScene(scene);
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        SceneManager.LoadScene("Title");
    }
}
