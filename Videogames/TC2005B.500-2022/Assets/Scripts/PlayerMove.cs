/*
Control of the player character

Gilberto Echeverria
*/

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMove : MonoBehaviour
{
    [SerializeField] float speed;    // In units per second
    [SerializeField] Vector2 jumpForce;

    Vector3 move;
    Rigidbody2D rb2d;
    public bool grounded = true;

    // Start is called before the first frame update
    void Start()
    {
        // Get a reference to another component on the same object
        rb2d = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        // Get the amount of motion over an axis
        move.x = Input.GetAxis("Horizontal") * speed;

        // Keep the current vertical velocity
        move.y = rb2d.velocity.y;

        // Detect an input to make the character jump
        if (Input.GetButtonDown("Jump") && grounded) {
            rb2d.AddForce(jumpForce);
            grounded = false;
        }

        // Add the motion to the current position
        //transform.position += move * speed * Time.deltaTime;

        rb2d.velocity = move;
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        grounded = true;
    }
}
