/*
Move a Rigid Body by applying forces

Gilberto Echeverria
*/

using UnityEngine;

public class RBMotion : MonoBehaviour
{
    // Jumping force
    [SerializeField] Vector2 force;
    // Walking speed
    [SerializeField] float speed;

    Rigidbody2D rb2D;
    Vector3 move;

    bool grounded;

    // Start is called before the first frame update
    void Start()
    {
        // Get a reference to the Rigid body to change physics
        rb2D = GetComponent<Rigidbody2D>();
        grounded = false;
    }

    // Update is called once per frame
    void Update()
    {
        // Move horizontally
        move.x = Input.GetAxis("Horizontal") * speed;
        move.y = rb2D.velocity.y;
        // By setting the velocity, the player reacts instantly to input
        rb2D.velocity = move;

        if (Input.GetButtonDown("Jump") && grounded) {
            // By applying a force, the player can use physics to alter
            //  the velocity
            rb2D.AddForce(force);
            grounded = false;
        }

        // Interrupt jump when the button is released
        if (Input.GetButtonUp("Jump") && !grounded) {
            Vector3 vel = rb2D.velocity;
            if (vel.y > 0) {
                vel.y /= 2;
                rb2D.velocity = vel;
            }
        }
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        grounded = true;
    }
}