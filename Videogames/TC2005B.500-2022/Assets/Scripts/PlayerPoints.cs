/*
Keep track of the score by adding points

Gilberto Echeverria
*/

using UnityEngine;
using UnityEngine.UI;

public class PlayerPoints : MonoBehaviour
{
    [SerializeField] Text scoreText;

    int points;

    // Start is called before the first frame update
    void Start()
    {
        points = 0;
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.tag == "Coin") {
            points++;
            // Store the points in a "global" variable
            PlayerPrefs.SetInt("points", points);
            scoreText.text = "Score: " + points;
            Destroy(col.gameObject);
        }  
    }
}
