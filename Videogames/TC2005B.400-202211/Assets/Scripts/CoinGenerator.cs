using UnityEngine;

public class CoinGenerator : MonoBehaviour
{
    // A reference to the object that will be copied
    [SerializeField] GameObject coinPrefab;
    // A distance from the player where the new object will be created
    [SerializeField] Vector3 offset;

    Transform playerPos;

    // Start is called before the first frame update
    void Start()
    {
        // Get a reference to the position of the player
        playerPos = GameObject.FindWithTag("Player").transform;
        // Regularly call the function MakeCoin. First time after 1 second
        // and then every 2 seconds
        InvokeRepeating("MakeCoin", 1, 2);        
    }

    void MakeCoin()
    {
        // Creates a copy of a prefab
        Instantiate(coinPrefab, playerPos.position + offset, Quaternion.identity);
    }
}
