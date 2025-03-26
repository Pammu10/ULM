const config = {
    env: {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT,
        imagekit: {
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
            urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
        },
        databaseUrl: process.env.DATABASE_URL!,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_URL!,
            redisToken: process.env.UPSTASH_REDIS_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        emailJS: {
            user: process.env.EMAILJS_USER!,
            password: process.env.EMAILJS_PASSWORD!,
            fromEmail: process.env.EMAILJS_FROM_EMAIL!,
        }
        
    }
}

export default config;