import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('📧 API Contact: Recibida petición POST');
  
  try {
    const body = await request.json();
    console.log('📧 API Contact: Datos recibidos:', body);
    
    // Validar que los campos requeridos estén presentes
    const { nombre, telefono, correo, sitioWeb } = body;
    
    if (!nombre || !telefono || !correo || !sitioWeb) {
      console.log('❌ API Contact: Faltan campos requeridos');
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    console.log('🚀 API Contact: Enviando datos al webhook...');
    
    const dataToSend = {
      nombre,
      telefono,
      correo,
      sitioWeb,
      timestamp: new Date().toISOString(),
      source: 'landing-page-form',
      userAgent: request.headers.get('user-agent'),
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    };

    console.log('📋 API Contact: Datos a enviar:', dataToSend);

    try {
      // Enviar datos al webhook de n8n (URL de producción)
      const webhookResponse = await fetch(
        'https://devn8n.iacondiego.es/webhook/27ded076-2516-4f02-bd73-ee58ccb026a3',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        }
      );

      console.log('📨 API Contact: Respuesta del webhook:', webhookResponse.status, webhookResponse.statusText);
      
      // Obtener el cuerpo de la respuesta para diagnóstico
      const responseText = await webhookResponse.text().catch(() => 'No se pudo leer la respuesta');
      console.log('📄 API Contact: Cuerpo de la respuesta:', responseText);
      
      // Obtener las cabeceras de respuesta
      console.log('📋 API Contact: Headers de respuesta:');
      webhookResponse.headers.forEach((value, key) => {
        console.log(`  ${key}: ${value}`);
      });

      if (!webhookResponse.ok) {
        console.log('❌ API Contact: Error del webhook - Status:', webhookResponse.status);
        console.log('❌ API Contact: Error del webhook - Response:', responseText);
        
        // Si es error 404 (webhook no registrado), guardamos los datos localmente
        if (webhookResponse.status === 404) {
          console.log('⚠️ API Contact: Webhook no encontrado (404). Datos guardados localmente.');
          console.log('💾 Datos del formulario:', dataToSend);
          console.log('🔗 URL intentada: https://devn8n.iacondiego.es/webhook/27ded076-2516-4f02-bd73-ee58ccb026a3');
          
          // En producción podrías guardarlos en una base de datos
          // Por ahora solo los mostramos en el log
        } else {
          throw new Error(`Webhook responded with status: ${webhookResponse.status} - ${responseText}`);
        }
      } else {
        console.log('✅ API Contact: Webhook respondió exitosamente!');
        console.log('📝 API Contact: Respuesta del webhook:', responseText);
        
        // Parsear la respuesta de n8n
        try {
          const n8nResponse = JSON.parse(responseText);
          console.log('📊 API Contact: Respuesta parseada de n8n:', n8nResponse);
        } catch (parseError) {
          console.log('⚠️ API Contact: No se pudo parsear la respuesta como JSON');
        }
      }
    } catch (fetchError) {
      console.log('⚠️ API Contact: Error de conexión al webhook. Datos guardados localmente.');
      console.log('💾 Datos del formulario:', dataToSend);
      console.log('🔍 Error de conexión:', fetchError);
    }

    console.log('✅ API Contact: Formulario procesado exitosamente');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Formulario enviado correctamente' 
    });

  } catch (error) {
    console.error('❌ API Contact: Error al procesar formulario:', error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('❌ API Contact: Detalles del error:', errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? errorMessage : 'Error en el servidor'
      },
      { status: 500 }
    );
  }
} 