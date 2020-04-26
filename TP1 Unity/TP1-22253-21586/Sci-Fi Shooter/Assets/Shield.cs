using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Shield : MonoBehaviour
{

    public int hitsNeeded = 10;
    public int hitsTaken;

    void OnCollisionEnter(Collision collisionInfo)
    {
        hitsTaken += 1;

        if (hitsTaken >= hitsNeeded)
            Destroy(gameObject);
    }
}
