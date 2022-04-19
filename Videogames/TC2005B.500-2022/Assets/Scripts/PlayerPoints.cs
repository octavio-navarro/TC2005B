/*
Keep track of the score by adding points

Gilberto Echeverria
*/

using UnityEngine;

public class PlayerPoints : MonoBehaviour
{
    [SerializeField] int points;

    // Start is called before the first frame update
    void Start()
    {
        points = 0;
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.tag == "Coin") {
            points++;
            Destroy(col.gameObject);
        }  
    }
}
