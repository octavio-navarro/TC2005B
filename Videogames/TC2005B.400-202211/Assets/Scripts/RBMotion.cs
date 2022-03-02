/*
Move a Rigid Body by applying forces

Gilberto Echeverria
*/

using UnityEngine;

public class RBMotion : MonoBehaviour
{
    [SerializeField] float force;
    [SerializeField] float speed;

    Rigidbody2D rb2D;
    Vector3 move;

    // Start is called before the first frame update
    void Start()
    {
        rb2D = GetComponent<Rigidbody2D>();
    }

    // Update is called once per frame
    void Update()
    {
        //move.x = Input.GetAxis("Horizontal") * force;
        //rb2D.AddForce(move);

        move.x = Input.GetAxis("Horizontal") * speed;
        move.y = rb2D.velocity.y;
        rb2D.velocity = move;
    }
}
