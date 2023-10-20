import { NextResponse } from 'next/server'

export const GET = async (
    req: Request,
    res: Response
    ) => {
    const execSync = require('child_process').execSync;
  
    const output = execSync('echo openoffice-eu-writer-4.1.5-9789.i586.rpm | rpm2cpe -rpm=1 -cpe=2 -e=1', { shell: '/bin/bash', encoding: 'utf-8' });  // the default is 'buffer'
    const splitted = output.split(/\r?\n/);  
    const filtered = splitted.filter( (e: string) => {
      return e !== '';
    });

    return NextResponse.json({message: filtered}, { status: 200 })
};