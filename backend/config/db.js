/* DB 구성파일 */
import mongoose from 'mongoose'

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URL)

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1) // Node.js 프로세스를 즉시 중지하고 종료하는 데 사용
	}
}

export default connectDb;