const {PrismaClient} = require('@prisma/client');
// const e = require('express');
const prisma = new PrismaClient();

//create a new customer
const createCustomer = async (req, res) => {
    const {customer_id, first_name, last_name, email, address, phone_number} = req.body;
    try {
        //create a new customer
        const cust = await prisma.customers.create({
            data: {
                customer_id,
                first_name,
                last_name,
                email, //ห้ามเมลซ้ำ
                address,
                phone_number
            }
        });
        //return the newly created customer
        res.status(200).json({
            status: "ok",
            message: `User with ID = ${cust.customer_id} is created successfully`,
        });
    } catch (err) {
        //return an error if the customer is fail
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
            error: err.message,
        });
    }
};

//get all customers

const getCustomers = async (req, res) => {
    const custs = await prisma.customers.findMany(); //ค้นหาข้อมูลลูกค้าทั้งหมด
    res.json(custs);
}

//delete a customer
const deleteCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const existingCustomer = await prisma.customers.findUnique({
            where: {
                customer_id: Number(id),
            },
    });
    //ถ้าไม่มีข้อมูลลูกค้า
    if(!existingCustomer) {
        return res.status(404).json({message: `Customer not found`});
    }
    //ลบข้อมูลลูกค้า
    await prisma.customers.delete({
        where: {
            customer_id: Number(id),
        },
    });

    res.status(200).json({
        status: "ok",
        message: `User with ID = ${id} is deleted `,
    });

}  catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({error: err.message});//ส่งข้อผิดพลาด
}
}
// get a customer by id
const getCustomer = async (req, res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.customers.findUnique({
            where: {
                customer_id: Number(id),
            },
        });
        if (!cust) {
            return res.status(404).json({ message: `Customer not found` });
        }
        res.status(200).json(cust); //ส่งข้อมูลลูกค้า
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json(err);
    }
};
// update a customer by id
const updateCustomer = async (req, res) => {
    const {first_name, last_name, email, address, phone_number} = req.body;
    const {id} = req.params; //รับค่า id จาก url

    const data ={}
    if (first_name) data.first_name = first_name;
    if (last_name) data.last_name = last_name;
    if (email) data.email = email;
    if (address) data.address = address;
    if (phone_number) data.phone_number = phone_number;

    //ตรวจสอบว่ามีข้อมูลที่จะอัพเดทหรือไม่
    if (Object.keys(data).length === 0) {
        return res.status(400).json({
            status: 'error',
            message: 'No data provided for update',
        });
    }
    try{
        //อัพเดทข้อมูลลูกค้า
        const cust = await prisma.customers.update({
           data,
           where: {
               customer_id: Number(id), //อัพเดทข้อมูลลูกค้า ตาม id
           },
        });
        //ส่งข้อความว่าอัพเดทข้อมูลสำเร็จ
        res.status(200).json({
            status: 'ok',
            message: `User with ID = ${id} is updated `,}); // ส่งข้อความว่าอัพเดทข้อมูลสำเร็จ
            user: cust
    } catch (err) {
        //จัดการข้อผิดพลาด
        if (err.code === 'P2002') {
            //ส่งข้อความว่าอีเมลซ้ำ
                res.status(400).json({
                status: 'error',
                message: 'email already exists',
            });
        }else if(err.code === 'P2025') {
            //ส่งข้อความว่าไม่พบข้อมูลลูกค้า
            res.status(404).json({
                status: 'error',
                message: `User with ID = ${id} not found`,
                error: err.message,
            }); 
        }else {
            //ส่งข้อความว่าอัพเดทข้อมูลลูกค้าไม่สำเร็จ
            console.error('Update user error:', err);
            res.status(500).json({
                status: 'error',
                message: 'Failed to update user',
                error: err.message,
            });
        }
    }
}
module.exports = {
    createCustomer,getCustomers ,deleteCustomer ,getCustomer ,updateCustomer
};