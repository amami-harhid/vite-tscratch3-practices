/**
 * 【01】練習課題 (2025/07/20 09:12)
 */
import {Pg, Lib} from "@tscratch3/tscratch3likejs/s3lib-importer";
import type { IPgMain as PgMain } from '@Type/pgMain';
import type { ISprite as Sprite } from '@Type/sprite';

// ---------------------------------
// タイトルを設定する
// ---------------------------------
Pg.title = "演習01";

// ---------------------------------
// アセットのURL
// ---------------------------------
const Host = 'https://amami-harhid.github.io/tscratch3assets';
//const CatSvg = Host + '/assets/cat.svg';
const AppleSvg = Host + '/assets/Apple.svg'; // ★ ⇒変更

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
    //this.Image.load(AppleSvg, Constants.CAT);
    this.Image.load(AppleSvg, Constants.APPLE); // ★ ⇒変更
}

// 事前準備処理
Pg.prepare = async function prepare() {
    // --------------------
    // CAT スプライトを作る
    // --------------------
    sprite = new Lib.Sprite('sprite');
    // コスチュームイメージを追加
    sprite.Image.add( Constants.APPLE ); // ★ ⇒変更
    //sprite.Image.add( Constants.CAT );
}

// イベント定義処理
Pg.setting = async function setting() {

}