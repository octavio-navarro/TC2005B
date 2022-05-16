/*
Bullets can deal damage to any enemy they hit

Gilberto Echeverria
*/

using UnityEngine;

public class BulletAttack : MonoBehaviour
{
    [SerializeField] int damage;

    void OnCollisionEnter2D(Collision2D col)
    {
        // Reduce the health of an enemy hit
        if (col.gameObject.tag == "Enemy") {
            //Debug.Log("Hit an enemy: " + col.gameObject.name);
            Health enemyHealth = col.gameObject.GetComponent<Health>();
            //Debug.Log("Dealing " + damage + " damage");
            enemyHealth.TakeDamage(damage);
        }
        // Make the bullet dissapear after hitting any object
        Destroy(gameObject);
    }
}
