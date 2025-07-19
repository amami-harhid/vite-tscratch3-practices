/**
 * 【09】練習課題
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type { IPgMain as PgMain } from '@Type/pgMain';
import type { ISprite as Sprite } from '@Type/sprite';

// ---------------------------------
// タイトルを設定する
// ---------------------------------
Pg.title = "演習09";

// ---------------------------------
// アセットのURL
// ---------------------------------
const Host = 'https://amami-harhid.github.io/tscratch3assets';
const CatSvg = Host + '/assets/cat.svg';
const Cat2Svg = Host + '/assets/cat2.svg'; // 追加の画像
const NyaWav = Host + '/assets/Cat.wav';

// ---------------------------------
// SUBをインポートする
// ---------------------------------
import { Constants } from "./sub/constants";
import { Messages } from "./sub/messages";

// ---------------------------------
// ステージとスプライトの変数を定義する
// ---------------------------------
let sprite: Sprite;

// 事前ロード処理
Pg.preload = async function( this: PgMain) {
    this.Image.load(CatSvg, Constants.CAT);
    this.Image.load(Cat2Svg, Constants.CAT2);
    this.Sound.load(NyaWav, Constants.NYA);
}

// 事前準備処理
Pg.prepare = async function prepare() {
    // --------------------
    // CAT スプライトを作る
    // --------------------
    sprite = new Lib.Sprite('sprite');
    sprite.Image.add( Constants.CAT );
    sprite.Image.add( Constants.CAT2 );
    sprite.Sound.add( Constants.NYA );
}

// イベント定義処理
Pg.setting = async function setting() {

    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function( this:Sprite ){
        // 向きを90度にする
        this.Motion.Direction.degree = 90;
        // 回転方法を「左右のみ」にする
        this.Motion.Rotation.style = Lib.RotationStyle.LEFT_RIGHT;
        // Y座標を設定
        this.Motion.Position.y = -100;
    })
    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function*( this:Sprite ){
        // ずっと繰り返し、(10)進ませて、端に着いたら跳ね返る
        for(;;){
            this.Motion.Move.steps( 10 );
            // もし端に着いたら跳ね返る
            this.Motion.Move.ifOnEdgeBounce();
            yield;
        }
    });

    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function*( this:Sprite ){
        // ずっと繰り返し、スペースキーが押されたときを判定し、押されているときはジャンプさせ音を鳴らす
        for(;;){
            // スペースキーが押されたとき
            if( this.Sensing.isKeyDown(Lib.Keyboard.SPACE)) {
                // 音を鳴らす
                this.Sound.play( Constants.NYA );
                await this.Event.broadcastAndWait( Messages.JUMP );
                await this.Control.waitWhile( ()=>this.Sensing.isKeyDown(Lib.Keyboard.SPACE) );
            }
            yield;
        }
    });
    /** ジャンプする初速 */
    const JUMP_FIRST_SPEED = 15;

    // メッセージ「JUMP」を受け取ったときの動作の定義
    sprite.Event.whenBroadcastReceived( Messages.JUMP, async function*(this:Sprite){
        /** ジャンプの速度 */
        let jumpSpeed = JUMP_FIRST_SPEED;
        const yStart = this.Motion.Position.y;
        for(;;){
            // 上に移動する
            this.Motion.Position.y += jumpSpeed;
            // 移動する量を少し減らす
            jumpSpeed -= 1;
            // Y座標が最初の位置より下になれば、繰り返しを終了する
            if( this.Motion.Position.y < yStart ) {
                break;
            }
            yield;
        }
        // 元に戻す
        this.Motion.Position.y = yStart;
    });

    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function*( this:Sprite ){
        // ずっと繰り返し、コスチュームを切り替える( 0.1 秒間隔で )
        for(;;){
            // 次のコスチュームにする
            this.Looks.Costume.next();
            // (0.1)秒待つ
            await this.Control.wait( 0.1 );
            yield;
        }
    });

}