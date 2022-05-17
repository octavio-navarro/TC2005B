/*
Script to control the change between Play and Edit mode in the game

NOTE: To avoid the spacebar toggling the mode, had to edit the second "Submit"
input on the Project Settings

Gilberto Echeverria
*/

using UnityEngine;

public class GameMode : MonoBehaviour
{
    [SerializeField] GameObject editCamera;
    [SerializeField] GameObject playCamera;
    [SerializeField] GameObject editCanvas;

    // Public variables that can be read from other scripts
    public enum Mode {PLAY, EDIT};
    // This value should be used to validate from other scripts, using:
    // if (GameMode.Mode.currentMode == Mode.PLAY)
    public static Mode currentMode = Mode.PLAY;

    public void ToggleMode()
    {
        // Go from play to edit
        if (currentMode == Mode.PLAY) {
            currentMode = Mode.EDIT;
            editCamera.SetActive(true);
            editCanvas.SetActive(true);
            playCamera.SetActive(false);
            // Stop the flow of game time
            Time.timeScale = 0;
        // Go from edit to play
        } else if (currentMode == Mode.EDIT) {
            currentMode = Mode.PLAY;
            editCamera.SetActive(false);
            editCanvas.SetActive(false);
            playCamera.SetActive(true);
            // Restore the flow of game time
            Time.timeScale = 1;
        }
    }

}
