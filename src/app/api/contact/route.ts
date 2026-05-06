import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Add the API key securely on the server side
    data.access_key = process.env.WEB3FORMS_KEY;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Accept: "application/json" 
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
