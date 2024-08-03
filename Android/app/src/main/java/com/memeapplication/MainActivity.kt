package com.memeapplication

import android.annotation.SuppressLint
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley

class MainActivity : AppCompatActivity() {
    private lateinit var requestQueue: RequestQueue
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        val button = findViewById<Button>(R.id.button)
        requestQueue = Volley.newRequestQueue(this)
        button.setOnClickListener {
            val ipAddress = findViewById<EditText>(R.id.ipAddress)
            val ipAddressReal =ipAddress.text.toString()
            val url = "$ipAddressReal:80/ack/abc"
            val jsonObjectRequest = JsonObjectRequest(
               Request.Method.GET, url, null,
                { response ->
                    // Display the JSON response in the EditText
                    ipAddress.setText(response.toString())
                    Toast.makeText(this, "Request Successful", Toast.LENGTH_SHORT).show()
                },
                { error ->
                    Log.e("MainActivity", "Error: ${error.message}")
                    Toast.makeText(this, "Request Failed", Toast.LENGTH_SHORT).show()
                }
            )

            // Add the request to the RequestQueue
            requestQueue.add(jsonObjectRequest)

        }
    }
}