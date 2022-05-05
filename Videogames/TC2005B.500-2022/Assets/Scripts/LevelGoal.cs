/*
Finish a level when the Player reaches this object

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class LevelGoal : MonoBehaviour
{
    [SerializeField] Text endMessage;

    void OnTriggerExit2D(Collider2D col)
    {
        if (col.tag == "Player") {
            endMessage.text = "You won!!!";
            // Change the scene
            // Program the call to be made after some time
            Invoke("ChangeScene", 2);
        }
    }
    
    void ChangeScene()
    {
        SceneManager.LoadScene("ResultScene");
    }
}
