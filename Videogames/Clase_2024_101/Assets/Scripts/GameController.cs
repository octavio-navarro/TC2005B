/*
Keep track of scores and ball status

Gilberto Echeverria
2024-02-21
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class GameController : MonoBehaviour
{
    public GameObject dotPrefab;
    public GameObject dot;
    public float force;

    public int pointsLeft = 0;
    public int pointsRight = 0;

    public TMP_Text leftScore;
    public TMP_Text rightScore;

    public int maxPoints;

    // Start is called before the first frame update
    void Start()
    {
        StartGame();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R)) {
            Reset();
        }        
    }

    public void StartGame()
    {
        pointsLeft = 0;
        pointsRight = 0;
        leftScore.text = pointsLeft.ToString();
        rightScore.text = pointsRight.ToString();
        Reset();
    }

    public void Reset()
    {
        Destroy(dot);
        // Create a copy of the prefab object
        dot = Instantiate(dotPrefab);
        dot.GetComponent<Rigidbody2D>().velocity = Random.onUnitSphere * force;
    }

    public void AddPoints(int side)
    {
        if (side == 1) {
            pointsLeft++;
            if (pointsLeft >= maxPoints) {
                leftScore.text = "Winner! " + pointsLeft.ToString();
            } else {
                leftScore.text = pointsLeft.ToString();
                Reset();
            }
        } else {
            pointsRight++;
            if (pointsRight >= maxPoints) {
                //UnityEngine.SceneManagement.SceneManager.LoadScene("Victory");                
                rightScore.text = "Winner! " + pointsRight.ToString();
            } else {
                rightScore.text = pointsRight.ToString();
                Reset();
            }
        }
    }
}
