import { GameEntity } from "@/entities/game/model/types";
import amqplib from "amqplib";

const RABBITMQ_URL = process.env.MB_URL || "amqp://localhost";

let connection: amqplib.ChannelModel | null = null;
let channel: amqplib.Channel | null = null;
const activeConsumers = new Map<Function, string>();

export class EventsChanel {
    constructor(private channelName: string) { }

    // Подключаемся к RabbitMQ и создаем канал
    async connectRabbitMQ() {
        if (!connection) {
            connection = await amqplib.connect(RABBITMQ_URL);
        }

        channel = await connection.createChannel();
        await channel.assertExchange(this.channelName, "direct", { durable: false });

        console.log("🐰 RabbitMQ connected");
        return channel;
    }

    // Публикация хода игрока
    async publishMove(key: string, data: Record<string, unknown>) {
        try {
            const ch = await this.connectRabbitMQ();
            await ch.publish(this.channelName, key, Buffer.from(JSON.stringify({
                ...data,
                date: new Date()
            })));
        } catch (err) {
            console.error("Failed to publish move:", err);
            throw err;
        }
    }

    async consumeMoves(key: string, listener: (data: unknown) => Promise<void> | void) {
        try {
            const channel = await this.connectRabbitMQ();

            const queue = await channel.assertQueue('', { exclusive: true });

            await channel.bindQueue(queue.queue, this.channelName, key)

            const consumer = await channel.consume(queue.queue, (msg) => {
                if (msg) {
                    try {
                        const move = JSON.parse(msg.content.toString()) as GameEntity;
                        listener(move);
                        channel.ack(msg);
                    } catch (err) {
                        console.error("Failed to process message:", err);
                        channel.nack(msg);
                    }
                }
            });

            return () => {
                channel.cancel(consumer.consumerTag)
            }
        } catch (err) {
            console.error("Failed to consume moves:", err);
            throw err;
        }
    }
}