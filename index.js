#!/usr/bin/env node

/**
 * Generador de Números Primos hasta N
 * Utiliza el algoritmo de Criba de Eratóstenes para máxima eficiencia
 */

const readline = require('readline');

// Criba de Eratóstenes - O(n log log n)
function generarPrimos(n) {
  if (n < 2) return [];
  
  const primos = new Array(n + 1).fill(true);
  primos[0] = primos[1] = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (primos[i]) {
      for (let j = i * i; j <= n; j += i) {
        primos[j] = false;
      }
    }
  }
  
  return primos
    .map((esPrimo, indice) => esPrimo ? indice : null)
    .filter(num => num !== null);
}

// Validar si un número es primo
function esPrimo(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

// Formato de números con separadores de miles
function formatearNumero(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Interfaz interactiva
function iniciarInterfaz() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║   GENERADOR DE NÚMEROS PRIMOS (v3.0)   ║');
  console.log('╚════════════════════════════════════════╝\n');

  function solicitarNumero() {
    rl.question('Ingresa N (límite máximo) o "salir": ', (respuesta) => {
      if (respuesta.toLowerCase() === 'salir') {
        console.log('\n¡Hasta luego! 👋\n');
        rl.close();
        return;
      }

      const n = parseInt(respuesta);

      if (isNaN(n) || n < 0) {
        console.log('⚠️  Por favor ingresa un número válido.\n');
        solicitarNumero();
        return;
      }

      if (n < 2) {
        console.log('ℹ️  No hay números primos menores a 2.\n');
        solicitarNumero();
        return;
      }

      const inicio = Date.now();
      const primos = generarPrimos(n);
      const tiempo = Date.now() - inicio;

      console.log(`\n✓ Generados ${formatearNumero(primos.length)} números primos en ${tiempo}ms`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      
      if (primos.length <= 100) {
        console.log(`Primos: ${primos.join(', ')}`);
      } else {
        const primeros = primos.slice(0, 10).join(', ');
        const ultimos = primos.slice(-10).join(', ');
        console.log(`Primeros 10: ${primeros}`);
        console.log(`Últimos 10:  ${ultimos}`);
      }
      
      console.log(`Mayor primo encontrado: ${formatearNumero(primos[primos.length - 1])}`);
      console.log(`Densidad de primos: ${(primos.length / n * 100).toFixed(2)}%\n`);

      solicitarNumero();
    });
  }

  solicitarNumero();
}

// Demostración automática si se pasa argumento
if (process.argv[2]) {
  const n = parseInt(process.argv[2]);
  
  if (isNaN(n) || n < 0) {
    console.error('Error: Argument must be a positive number');
    process.exit(1);
  }

  console.log(`\n📊 Generando números primos hasta ${formatearNumero(n)}...\n`);
  
  const inicio = Date.now();
  const primos = generarPrimos(n);
  const tiempo = Date.now() - inicio;

  console.log(`✓ Total de primos: ${formatearNumero(primos.length)}`);
  console.log(`⏱️  Tiempo de ejecución: ${tiempo}ms`);
  console.log(`📈 Densidad de primos: ${(primos.length / n * 100).toFixed(2)}%`);
  console.log(`🔝 Mayor primo: ${formatearNumero(primos[primos.length - 1])}`);
  
  if (primos.length <= 50) {
    console.log(`\n📋 Listado completo:\n${primos.join(', ')}\n`);
  } else {
    console.log(`\n📋 Primeros 20: ${primos.slice(0, 20).join(', ')}`);
    console.log(`📋 Últimos 20:  ${primos.slice(-20).join(', ')}\n`);
  }
} else {
  iniciarInterfaz();
}