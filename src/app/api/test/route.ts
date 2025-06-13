import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  console.log('🧪 API Test: GET request recibida');
  return NextResponse.json({ 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('🧪 API Test: POST request recibida');
  
  try {
    const body = await request.json();
    console.log('🧪 API Test: Datos recibidos:', body);
    
    return NextResponse.json({ 
      message: 'POST recibido correctamente',
      received: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('🧪 API Test: Error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la petición' },
      { status: 400 }
    );
  }
} 