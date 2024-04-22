/*
Script to generate the sequence of buttons to show, and then compare with
the user inputs

Gilberto Echeverria
2024-03-06
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SimonController : MonoBehaviour
{
    [SerializeField] List<int> sequence;
    [SerializeField] GameObject buttonPrefab;
    [SerializeField] int numButtons;
    [SerializeField] GameObject panel;

    [SerializeField] GameObject[] buttons;

    bool playerTurn = false;
    int index;
    int level;

    // Start is called before the first frame update
    void Start()
    {
        NewGame();
    }

    public void NewGame()
    {
        ClearExistingButtons();
        sequence = new List<int>();
        index = 0;
        level = 0;
        PlayerPrefs.SetInt("score", 0);
        MakeButtons();
        AddNumber();
    }

    void MakeButtons()
    {
        float posX = 100;
        float posY = 300;
        // Initialize the array of buttons
        buttons = new GameObject[numButtons];
        for (int i=0; i<numButtons; i++) {
            // Variable to use as the identifier for each button
            int id = i;
            // Define a position for the button (ignored if using the panel layout)
            if (i % 5 == 0) {
                posY -= 100;
                posX = 100;
            } else {
                posX += 100;
            }
            // Create a copy of the buttons
            buttons[i] = Instantiate(buttonPrefab, new Vector3(posX, posY, 0), Quaternion.identity);
            // Set the image for the button
            //buttons[i].GetComponent<Image>().sprite = Resources.Load<Sprite>("Sprites/" + (id%4).ToString());
            // Change the button color
            buttons[i].GetComponent<Image>().color = Color.HSVToRGB((float)id/numButtons, 1.0f - (float)id/numButtons, 1.0f);
            // Change the sound attached to the audio source
            buttons[i].GetComponent<AudioSource>().clip = Resources.Load<AudioClip>("Sounds/" + (id%9).ToString());
            // Set the callback when the button is pressed
            buttons[i].GetComponent<Button>().onClick.AddListener( () => { ButtonSelect(id); } );
            // Set the parent of the button to the panel
            buttons[i].transform.SetParent(panel.transform);
        }
    }

    void ClearExistingButtons()
    {
        // Destroy all the buttons in the scene
        foreach (GameObject button in buttons) {
            Destroy(button);
        }
    }

    // Add a new number to the sequence that the player must replay
    void AddNumber()
    {
        playerTurn = false;
        index = 0;
        int num = Random.Range(0, buttons.Length);
        sequence.Add(num);
        StartCoroutine(ShowSequence());
    }

    // Display all the buttons in the sequence
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

    // Callback for the buttons, that will compare if they are
    // in the correct sequence order
    public void ButtonSelect(int buttonID)
    {
        // Exit if if it's the computer's turn
        if (!playerTurn) {
            return;
        }
        // Show the button pressed by the player
        Debug.Log("Button " + buttonID + " pressed");
        buttons[buttonID].GetComponent<SimonButton>().HighLight();
        //Debug.Log("Pressed: " + buttonID + " | Should be: " + sequence[index]);
        if (sequence[index] == buttonID) {
            // Continue the sequence
            index++;
            // Check if we completed the sequence
            if (index == sequence.Count) {
                level++;
                PlayerPrefs.SetInt("score", level);
                if (level > PlayerPrefs.GetInt("highscore", 0)) {
                    PlayerPrefs.SetInt("highscore", level);
                }
                AddNumber();
            }
        } else {
            // Game over
            Debug.Log("GAME OVER");
            UnityEngine.SceneManagement.SceneManager.LoadScene("SimonResults");
        }
    }
}