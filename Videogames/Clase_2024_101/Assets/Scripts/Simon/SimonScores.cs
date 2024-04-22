/*
Retrieve the high score from the player preferences and display it on the screen.

Gilberto Echeverria
2024-04-21
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SimonScores : MonoBehaviour
{
    [SerializeField] TMP_Text scoreText;
    [SerializeField] TMP_Text highScoreText;

    // Start is called before the first frame update
    void Start()
    {
        int score = PlayerPrefs.GetInt("score", 0);
        int highScore = PlayerPrefs.GetInt("highscore", 0);
        scoreText.text = "Your Score: " + score;
        highScoreText.text = "High Score: " + highScore;
    }
}
