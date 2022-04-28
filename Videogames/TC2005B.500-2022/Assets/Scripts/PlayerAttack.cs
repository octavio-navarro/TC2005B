/*
Control how the player can attack the enemies

Gilberto Echeverria
*/

using UnityEngine;

public class PlayerAttack : MonoBehaviour
{
    [SerializeField] Transform spawn;
    [SerializeField] GameObject bulletPrefab;

    void Update()
    {
        if (Input.GetButtonDown("Fire1")) {
            Instantiate(bulletPrefab, spawn.position, Quaternion.identity);
        }
    }

    void OnCollisionEnter2D(Collision2D col)
    {
        if (col.collider.tag == "WeakPoint") {
            Health enemyHealth = col.gameObject.GetComponent<Health>();
            enemyHealth.TakeDamage(1);
        }
    }
}
