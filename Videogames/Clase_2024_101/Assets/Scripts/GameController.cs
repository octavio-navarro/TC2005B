/*
Keep track of scores and ball status

Gilberto Echeverria
2024-02-21
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameController : MonoBehaviour
{
    public GameObject dotPrefab;
    public GameObject dot;
    public float force;

    public int pointsLeft = 0;
    public int pointsRight = 0;

    // Start is called before the first frame update
    void Start()
    {
        StartGame();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R)) {
            Destroy(dot);
            StartGame();
        }        
    }

    void StartGame()
    {
        // Create a copy of the prefab object
        dot = Instantiate(dotPrefab);
        dot.GetComponent<Rigidbody2D>().velocity = Random.onUnitSphere * force;
    }

    public void AddPoints(int side)
    {
        if (side == 1) {
            pointsLeft++;
        } else {
            pointsRight++;
        }
        Destroy(dot);
        StartGame();
    }
}
