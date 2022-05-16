/*
Show the results in the UI

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Results : MonoBehaviour
{
    [SerializeField] Text resultText;

    // Start is called before the first frame update
    void Start()
    {
        // Get the value stored globally
        int points = PlayerPrefs.GetInt("points");
        resultText.text = "You won!!!\n\nTotal points: " + points;
    }

    /*
    void Update()
    {
        // Change the scene when pressing any mouse button
        if (Input.GetMouseButton(0) || Input.GetMouseButton(1)) {
            SceneManager.LoadScene("GameScene");
        }
    }
    */

    public void GoToScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);

    }
}
