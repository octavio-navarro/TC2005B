/*
Enemies that move back and forth over a platform
The platform must have triggers at the edges

Gilberto Echeverria
*/

using UnityEngine;

public class EnemyPatrol : MonoBehaviour
{
    [SerializeField] float speed;

    int direction = 1;
    Vector3 move;

    // Start is called before the first frame update
    void Start()
    {
        move = new Vector3(direction * speed * Time.deltaTime, 0, 0);
    }

    // Update is called once per frame
    void Update()
    {
        transform.Translate(move);
    }

    void OnTriggerEnter2D(Collider2D col)
    {
        if (col.tag == "Edge")
        {
            direction *= -1;
            move = new Vector3(direction * speed * Time.deltaTime, 0, 0);
        }
    }
}
