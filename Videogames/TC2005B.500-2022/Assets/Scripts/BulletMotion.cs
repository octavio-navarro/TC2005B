/*
Movement of a bullet in a straight line

Gilberto Echeverria
*/

using UnityEngine;

public class BulletMotion : MonoBehaviour
{
    [SerializeField] float speed;

    // Start is called before the first frame update
    void Start()
    {
        Rigidbody2D db2d = GetComponent<Rigidbody2D>();
        db2d.velocity = Vector3.right * speed;
    }
}
