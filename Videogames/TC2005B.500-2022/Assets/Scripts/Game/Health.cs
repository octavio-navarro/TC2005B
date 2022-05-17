/*
Keep control of a characters HP and damage

Gilberto Echeverria
*/

using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField] int maxHP;

    int currentHP;

    // Start is called before the first frame update
    void Start()
    {
        currentHP = maxHP;
    }

    public void TakeDamage(int amount)
    {
        //Debug.Log("Object: " + gameObject.name + " taking damage: " + amount);
        if (currentHP > 0) {
            currentHP -= amount;
        }
        if (currentHP <= 0) {
            Destroy(gameObject);
        }
    }
}
