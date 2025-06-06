import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}


// async function dropTable(){
//   const data = await sql`
//   DROP TABLE pg_extension;
//   `;
//   return data;
// }

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listInvoices());
    // return Response.json(await dropTable());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
