import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🧪 Test Webhook: Iniciando prueba del webhook...');
  
  const testData = {
    nombre: 'Test Usuario',
    telefono: '+34 600 000 000',
    correo: 'test@example.com',
    sitioWeb: 'https://test.com',
    timestamp: new Date().toISOString(),
    source: 'test-endpoint'
  };

  try {
    console.log('🚀 Test Webhook: Enviando datos de prueba:', testData);
    
    const response = await fetch(
      'https://devn8n.iacondiego.es/webhook/27ded076-2516-4f02-bd73-ee58ccb026a3',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      }
    );

    console.log('📨 Test Webhook: Status:', response.status);
    console.log('📨 Test Webhook: StatusText:', response.statusText);
    
    const responseText = await response.text().catch(() => 'No response body');
    console.log('📄 Test Webhook: Response:', responseText);
    
    console.log('📋 Test Webhook: Headers:');
    response.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      response: responseText,
      testData: testData
    });

  } catch (error) {
    console.error('❌ Test Webhook: Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
      testData: testData
    });
  }
} 