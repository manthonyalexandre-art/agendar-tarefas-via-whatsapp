package com.example.carteiradigital

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.example.carteiradigital.ui.theme.CarteiraDigitalTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CarteiraDigitalTheme {
                WalletApp()
            }
        }
    }
}

data class StockOption(
    val ticker: String,
    val company: String,
    val currentPrice: String,
    val dailyChange: String
)

@Composable
fun WalletApp() {
    val options = listOf(
        StockOption("PETR4", "Petrobras", "R$ 38,42", "+1,22%"),
        StockOption("VALE3", "Vale", "R$ 61,11", "-0,70%"),
        StockOption("ITUB4", "Itaú Unibanco", "R$ 31,90", "+0,35%"),
        StockOption("AAPL", "Apple", "US$ 227.54", "+0.90%"),
        StockOption("TSLA", "Tesla", "US$ 217.97", "-1.12%")
    )

    Scaffold(
        topBar = {
            TopAppBar(title = { Text("Carteira Digital") })
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                BalanceCard(balance = "R$ 12.480,75")
            }
            item {
                QuickActions()
            }
            item {
                Text(
                    text = "Opções de Bolsa",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold
                )
            }
            items(options) { option ->
                StockOptionCard(option)
            }
        }
    }
}

@Composable
fun BalanceCard(balance: String) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent)
    ) {
        Column(
            modifier = Modifier
                .background(
                    Brush.linearGradient(
                        colors = listOf(Color(0xFF1E3A8A), Color(0xFF2563EB))
                    )
                )
                .padding(20.dp)
        ) {
            Text("Saldo disponível", color = Color.White.copy(alpha = 0.8f))
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = balance,
                style = MaterialTheme.typography.headlineMedium,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }
    }
}

@Composable
fun QuickActions() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("Depositar") }
        Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("Sacar") }
        Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("Transferir") }
    }
}

@Composable
fun StockOptionCard(option: StockOption) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(option.ticker, fontWeight = FontWeight.Bold)
                Text(option.company, color = Color.Gray)
            }
            Column(horizontalAlignment = Alignment.End) {
                Text(option.currentPrice, fontWeight = FontWeight.SemiBold)
                Text(
                    option.dailyChange,
                    color = if (option.dailyChange.startsWith("+")) Color(0xFF16A34A) else Color(0xFFDC2626)
                )
            }
        }
    }
}
