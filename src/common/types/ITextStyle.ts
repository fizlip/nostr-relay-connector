export interface ITextStyle{
    fontSize: StyleValue;
    paddingLeft: StyleValue;
    paddingRight: StyleValue;
    font: StyleValue;
    color: StyleValue;
    width: StyleValue;
}

type StyleValue = {
    cssName: string,
    value: string,
    className: string,
}
