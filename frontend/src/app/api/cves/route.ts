import { Yuji_Boku } from 'next/font/google';
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
    req: NextRequest,
    res: NextResponse
    ) => {
    console.log(req.nextUrl.searchParams.get("package_name"));
    const execSync = require('child_process').execSync;
  
    const output = execSync(`echo ${req.nextUrl.searchParams.get("package_name")} | rpm2cpe -rpm=1 -cpe=2 -e=1`, { shell: '/bin/bash', encoding: 'utf-8' });  // the default is 'buffer'
    const splitted = output.split(/\r?\n/);  
    const filtered = splitted.filter( (e: string) => {
      return e !== '';
    });

    return NextResponse.json({message: filtered}, { status: 200 })
};
