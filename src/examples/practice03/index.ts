/**
 * 【03】練習課題
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type { IPgMain as PgMain } from '@Type/pgMain';
import type { ISprite as Sprite } from '@Type/sprite';

// ---------------------------------
// タイトルを設定する
// ---------------------------------
Pg.title = "演習03";

// ---------------------------------
// アセットのURL
// ---------------------------------
const Host = 'https://amami-harhid.github.io/tscratch3assets';
const CatSvg = Host + '/assets/cat.svg';

// ---------------------------------
// SUBをインポートする
// ---------------------------------
import { Constants } from "./sub/constants";

// ---------------------------------
// ステージとスプライトの変数を定義する
// ---------------------------------
let sprite: Sprite;

// 事前ロード処理
Pg.preload = async function( this: PgMain) {
    this.Image.load(CatSvg, Constants.CAT);
}

// 事前準備処理
Pg.prepare = async function prepare() {
    // --------------------
    // CAT スプライトを作る
    // --------------------
    sprite = new Lib.Sprite('sprite');
    sprite.Image.add( Constants.CAT );
    // ドラッグ可能とする
    sprite.DragMode.draggable = true;
}

// イベント定義処理
Pg.setting = async function setting() {

    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function( this:Sprite ){
        // 向きを45度にする
        this.Motion.Direction.degree = 45;
    })
    // スプライト：旗が押されたときの動作の定義
    sprite.Event.whenFlag( async function*( this:Sprite ){
        // ずっと繰り返し、(10)進ませて、端に着いたら跳ね返る
        for(;;){
            // (10)進ませる
            this.Motion.Move.steps( 10 );
            // もし端に着いたら跳ね返る
            this.Motion.Move.ifOnEdgeBounce();
            yield;
        }
    })
}