﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Loss : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if(collision.gameObject.CompareTag("ballTag"))
        {
            GameObject.Find("Ball").GetComponent<Ball>().Reset();
            GameObject.Find("gameManagerObj").GetComponent<Manager>().Reset();
            GameObject.Find("Player1").GetComponent<Paddle>().Reset();
        }
    }
}
