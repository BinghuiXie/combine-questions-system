import { Component, Vue, Prop } from 'vue-property-decorator';
import './style.scss';

@Component
export default class Card extends Vue {
    @Prop()
    readonly imgUrl!: string;

    @Prop()
    readonly title!: string;

    @Prop()
    readonly intro!: string;

    @Prop()
    readonly identityLabel!: '教师' | '学生';

    render() {
        return (
            <div class='card-container'>
                <div class='card-container__inner'>
                    <div class='card-container__inner-bgimg'>
                        <img src={this.imgUrl} alt=""/>
                    </div>
                    <div class='card-container__inner-content'>
                        <div class='card-container__inner-content__text'>
                            <p class='title'>{ this.title }</p>
                            <p class='intro'>
                                { this.intro }
                            </p>
                        </div>
                        <div class='card-container__inner-content__label'>
                            { this.identityLabel }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}