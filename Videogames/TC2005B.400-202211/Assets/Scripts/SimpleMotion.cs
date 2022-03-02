/*
Basic motion affecting the transform of an object

Gilberto Echeverria
2022-02-23
*/

using UnityEngine;

public class SimpleMotion : MonoBehaviour
{
    // The speed in units / second
    [SerializeField] float speed = 20;

    // This variable will store the direction of the movement
    Vector3 move;

    // Update is called once per frame
    void Update()
    {
        // Read the input from keyboard or gamepad
        move.x = Input.GetAxis("Horizontal");
        move.y = Input.GetAxis("Vertical");

        // Apply the new data to the object transform
        transform.Translate(move * speed * Time.deltaTime);

        /*
        // Code like this can be used to limit the range of movement of
        //  the player
        if (transform.position.x > 500)
        {
            Vector3 pos = transform.position;
            pos.x = 500;
            transform.position = pos;
        }
        */
    }
}
