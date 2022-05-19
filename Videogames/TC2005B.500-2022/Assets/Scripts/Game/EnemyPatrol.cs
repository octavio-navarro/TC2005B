/*
Enemies that move back and forth over a platform
The platform must have triggers at the edges with the tag 'Edge'
When touching other enemies the movement will switch direction
Also deal damage when touching the player

Gilberto Echeverria
*/

using UnityEngine;

public class EnemyPatrol : MonoBehaviour
{
    [SerializeField] float speed;

    int direction = 1;
    Vector3 vel;
    //Vector3 move;

    Rigidbody2D db2d;

    // Start is called before the first frame update
    void Start()
    {
        // Randomly select the starting direction
        direction = (Random.value > 0.5f ? 1 : -1);
        //Debug.Log("Direction " + gameObject.name + " = " + direction);
        db2d = GetComponent<Rigidbody2D>();
        vel = Vector3.right * speed * direction;
        db2d.velocity = vel;
        //move = new Vector3(direction * speed * Time.deltaTime, 0, 0);
    }

    // Update is called once per frame
    void Update()
    {
        //transform.Translate(move);
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.tag == "Edge") {
            SwitchDirection();
            //move = new Vector3(direction * speed * Time.deltaTime, 0, 0);
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        // Damage the player when touching it
        if (col.gameObject.tag == "Player") {
            // Get a reference to another script
            Health playerHealth = col.gameObject.GetComponent<Health>();
            playerHealth.TakeDamage(1);
        }
        if (col.gameObject.tag == "Enemy") {
            SwitchDirection();
        }
    }

    void SwitchDirection()
    {
        direction *= -1;
        vel = Vector3.right * speed * direction;
        db2d.velocity = vel;
    }
}
