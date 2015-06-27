
class Radio extends SimpleModule
    _tpl: '''
    <div class="simple-radio">
        <input type="radio" name="radio_demo" value="0"/>
        <input type="radio" name="radio_demo" value="1"/>
        <div class="dot"></div>
    </div>
    '''
    _init: ->


radio = (opts) ->
    new Radio(opts)
