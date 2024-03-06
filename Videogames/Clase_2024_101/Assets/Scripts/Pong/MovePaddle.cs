/*
Script to move the paddles in the Pong game

Gilberto Echeverria
2024-02-19
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePaddle : MonoBehaviour
{
    public float speed;
    public float limit;

    public KeyCode moveUp;
    public KeyCode moveDown;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKey(moveUp) && transform.position.y < limit) {
            transform.Translate(Vector3.up * speed * Time.deltaTime);
        }
        if (Input.GetKey(moveDown) && transform.position.y > -limit) {
            transform.Translate(Vector3.down * speed * Time.deltaTime);
        }
    }
}
