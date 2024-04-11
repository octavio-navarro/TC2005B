
/*
Control the movements of a game paddle
Can be used for horizontal or vertical movement

Gilberto Echeverria
2024-04-09
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PaddleMotion : MonoBehaviour
{
    [SerializeField] float speed;
    [SerializeField] Vector2 direction;
    [SerializeField] KeyCode positiveKey;
    [SerializeField] KeyCode negativeKey;
    [SerializeField] float limit;

    // Update is called once per frame
    void Update()
    {
        // Move the game object when the keys are pressed
        if (Input.GetKey(positiveKey) && GetMotionPosition() < limit) {
            transform.Translate(direction * speed * Time.deltaTime);
        } else if (Input.GetKey(negativeKey) && GetMotionPosition() > -limit) {
            transform.Translate(-direction * speed * Time.deltaTime);
        }
    }

    // Identify the position along the direction of movement
    float GetMotionPosition()
    {
        if (direction.x != 0) {
            return transform.position.x;
        } else if (direction.y != 0) {
            return transform.position.y;
        } else {
            return 0;
        }
    }
}
