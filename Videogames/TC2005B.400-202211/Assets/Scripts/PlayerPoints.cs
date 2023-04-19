/*
Keep track of the points collected by the player

Gilberto Echeverria
*/

using System.Collections;
using UnityEngine;
using UnityEngine.UI;

public class PlayerPoints : MonoBehaviour
{
    [SerializeField] int points;
    [SerializeField] Text pointsText;
    [SerializeField] SpriteRenderer colorRenderer;
    [SerializeField] Color startColor;
    [SerializeField] Color endColor;
    [SerializeField] float flashStep;

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.gameObject.tag == "Ball") {
            points++;
            pointsText.text = "Score: " + points;
            // Start a new process to animate the flasing plane
            StartCoroutine(Flash());
        }   
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.gameObject.tag == "Coin") {
            Destroy(col.gameObject);
            points += 5;
            pointsText.text = "Score: " + points;
        }
    }

    // This method must be of type IEnumerator to be able to wait
    IEnumerator Flash()
    {
        Color newColor;
        for (int i=0; i<5; i++) {
            newColor = Color.Lerp(startColor, endColor, i/5.0f);
            colorRenderer.color = newColor;
            // Sleep this process for some time
            yield return new WaitForSeconds(flashStep);
        }
        for (int i=0; i<5; i++) {
            newColor = Color.Lerp(endColor, startColor, i/5.0f);
            colorRenderer.color = newColor;
            // Sleep this process for some time
            yield return new WaitForSeconds(flashStep);
        }
        colorRenderer.color = startColor;
    }
}
