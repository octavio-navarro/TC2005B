/*
Script to generate the sequence of buttons to show, and then compare with
the user inputs

Gilberto Echeverria
2024-03-06
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SimonController : MonoBehaviour
{
    [SerializeField] List<int> sequence;
    [SerializeField] GameObject[] buttons;

    bool playerTurn = false;
    int index;
    int level;

    // Start is called before the first frame update
    void Start()
    {
        NewGame();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void NewGame()
    {
        sequence = new List<int>();
        index = 0;
        level = 0;
        AddNumber();
    }

    void AddNumber()
    {
        playerTurn = false;
        index = 0;
        int num = Random.Range(0, buttons.Length);
        sequence.Add(num);
        StartCoroutine(ShowSequence());
    }

    IEnumerator ShowSequence()
    {
        yield return new WaitForSeconds(1);
        for (int i=0; i<sequence.Count; i++) {
            int num = sequence[i];
            // Call a method on the Button script
            buttons[num].GetComponent<SimonButton>().HighLight();
            yield return new WaitForSeconds(1);
        }
        playerTurn = true;
    }

    public void ButtonSelect(int buttonID)
    {
        if (playerTurn) {
            buttons[buttonID].GetComponent<SimonButton>().HighLight();
            //Debug.Log("Pressed: " + buttonID + " | Should be: " + sequence[index]);
            if (sequence[index] == buttonID) {
                // Continue the sequence
                index++;
                // Check if we completed the sequence
                if (index == sequence.Count) {
                    level++;
                    PlayerPrefs.SetInt("score", level);
                    AddNumber();
                }
            } else {
                // Game over
                Debug.Log("GAME OVER");
                UnityEngine.SceneManagement.SceneManager.LoadScene("SimonResults");
            }
        }
    }
}
