
class Radio extends SimpleModule
    _tpl: '''
    <div class="simple-radio on">
        <input type="radio" name="radio_demo" value="0"/>
        <input type="radio" name="radio_demo" value="1"/>
        <div class="dot"></div>
    </div>
    '''
    _init: ->
        @radio = $(@opts.el).first()
        throw new Error "simple-radio: el option is invalid" if @radio.length == 0
        @on = @radio.prop "on"
        @size = if @radio.data "size" then @radio.data "size" else 32
        @_render()

    _render: ->
        @radio.hide()
        @el = $(@_tpl).insertAfter @radio
        @el.css("height", @size)
        @el.css("width", @size * 1.6)
        @el.css("border-radius", @size)
        console.log @el.html()

radio = (opts) ->
    new Radio(opts)
